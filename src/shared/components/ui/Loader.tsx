import { useEffect } from "react";

function Loader() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed  inset-0 z-50 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
      <div className="loader bg-secondary"></div>
    </div>
  );
}

export default Loader;
