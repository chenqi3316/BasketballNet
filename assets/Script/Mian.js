// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        m_ball: cc.Node,    //篮球节点
        m_net: cc.Node,
        m_down: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getPhysicsManager().enabled = true
        //设置篮网和篮筐外层的显示关系
        this.m_net.zIndex = 6
        this.m_down.zIndex = 7
        //激活触摸监听
        this.AddTouchEvent()
    },

    start() {

    },

    AddTouchEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    },

    OffTouchEvent() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
    },

    onTouchStart() {
        //设置篮球的速度
        this.m_ball.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 1600)
        //设置篮球的重力
        this.m_ball.getComponent(cc.RigidBody).gravityScale = 6
    },

    // update (dt) {},
});
