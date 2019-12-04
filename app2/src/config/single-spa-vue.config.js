import store from '../store'

export default (lifecycles) => {
  const bootstrap = lifecycles.bootstrap;
  const mount = (props) => {
    store.state.keepAliveTabs = props.keepAliveTabs;
    for (let key in props.store) {
      store.state[key] = props.store[key];
    }
    return lifecycles.mount(props);
  };
  const unmount = lifecycles.unmount;

  return {
    bootstrap,
    mount,
    unmount
  }
}