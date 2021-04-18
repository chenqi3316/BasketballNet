// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        LeftEdgeLine: [cc.Node],    //左边缘线条
        RightEdgeLine: [cc.Node],   //右边缘线条
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //获得自身的 Graphics 组件
        this.graphics = this.node.getComponent(cc.Graphics);
        //获得节点下所有孩子节点的Distance的组件，返回的是一个数组
        this.distanceJoints = this.node.getComponentsInChildren(cc.DistanceJoint);
        //设置所有Distanc组件的属性
        this.AutoSetDistanceJoint();
        cc.log('篮网开始构建')
    },

    start() {

    },

    //distance属性设置是节点与连接的刚体之间的距离
    //.mag() 内部算法是(x2+y2)开根号
    //如果发现篮网相互黏在一起，黏在一起的愿意是弹性系数太大或者太小，修改弹性系数到相应值即可
    AutoSetDistanceJoint: function () {
        for (var i = 0; i < this.distanceJoints.length; i++) {
            //设置链条的距离
            this.distanceJoints[i].distance = (this.distanceJoints[i].node.position.sub(this.distanceJoints[i].connectedBody.node.position)).mag();
            //设置链条的弹性系数
            this.distanceJoints[i].frequency = 5
        }
    },

    update: function (dt) {
        //绘制器初始化
        this.graphics.clear();

        for (let i = 0; i < this.distanceJoints.length; i++) {
            //绘制器渲染篮网
            var fromX = this.distanceJoints[i].node.position.x;
            var fromY = this.distanceJoints[i].node.position.y;
            var toX = this.distanceJoints[i].connectedBody.node.x;
            var toY = this.distanceJoints[i].connectedBody.node.y;
            this.graphics.moveTo(fromX, fromY);
            this.graphics.lineTo(toX, toY);
            this.graphics.stroke();
        }
        //更新链条的碰撞组件
        this.UpdateAllChainCollider();
    },

    UpdateAllChainCollider: function () {
        //这是是从1开始的，因为篮筐上的四个点是没有添加distance组件。
        for (let i = 1; i < this.LeftEdgeLine.length; i++) {
            //设置碰撞链条位置
            this.LeftEdgeLine[i].getComponent(cc.PhysicsChainCollider).points[1] = this.LeftEdgeLine[i - 1].position.sub(this.LeftEdgeLine[i].position);
            this.RightEdgeLine[i].getComponent(cc.PhysicsChainCollider).points[1] = this.RightEdgeLine[i - 1].position.sub(this.RightEdgeLine[i].position);
            //设置完调用 apply()函数使其生效
            this.LeftEdgeLine[i].getComponent(cc.PhysicsChainCollider).apply();
            this.RightEdgeLine[i].getComponent(cc.PhysicsChainCollider).apply();
        }
    }
});
