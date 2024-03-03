const a = () => {
  const b = () => {
    const c = () => {};
    const d = () => {};
    const e = () => {};
  };
  const f = () => {
    return () => {
      return b();
    }
  };
  const g = () => {
    const h = () => {
      const i = () => {
        const j = () => {
          const k = () => {
            return 0;
          }
          return k();
        }
        return j();
      }
      return i();
    }
    return h();
  }
  return b() || f() || g();
}
