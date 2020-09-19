const Subscription = {
  dado: {
    subscribe (parent, args, ctx, info){
      setInterval (() => {
        ctx.pubSub.publish ('dado', {
          dado: Math.floor (Math.random() * 6) + 1
        })
      }, 2000);
      return ctx.pubSub.asyncIterator ('dado');
    }
  }
};

export default Subscription;