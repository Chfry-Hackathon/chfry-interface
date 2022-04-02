import Vue from "vue";

export default function create(Component, props) {
  // vue.extend()获取创建实例
  const Ctor = Vue.extend(Component);
  // 创建组件实例,这时得到的是虚拟dom，如何转化为真实dom
  const comp = new Ctor({
    propsData: props,
  });
  // 前面说到$mount就是这个作用
  comp.$mount();

  // 挂在在body上，这时是comp的dom
  document.body.appendChild(comp.$el);

  comp.remove = () => {
    // 移除本身
    document.body.removeChild(comp.$el);
    // 释放自己所占资源
    comp.$destroy();
  };

  return comp;
}
