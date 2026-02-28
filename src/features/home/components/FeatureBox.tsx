import useInView from "../../../shared/hooks/useInView";

type FeatureProps = {
  title: string;
  description: string;
  icon: React.ComponentType;
};

function FeatureBox({
  delay,
  feature,
}: {
  delay: number;
  feature: FeatureProps;
}) {
  const IconComponent = feature.icon;

  const { ref, visible } = useInView();
  return (
    <div
      style={{ transitionDelay: delay + "ms" }}
      ref={ref}
      className={`${visible ? "translate-y-0 opacity-100" : " translate-y-15 opacity-0"} transition-all duration-300 flex flex-col items-center text-center`}
    >
      <div className="flex items-center justify-center bg-blue-100 size-16 rounded-full mb-4 hover:rotate-5 hover:scale-110 transition-transform duration-200">
        <div className={` text-3xl text-secondary`}>
          <IconComponent />
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">{feature.title}</h3>
        <p className="text-gray-600 text-sm">{feature.description}</p>
      </div>
    </div>
  );
}

export default FeatureBox;
