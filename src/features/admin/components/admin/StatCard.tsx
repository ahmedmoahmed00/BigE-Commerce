import { IoIosTrendingUp } from "react-icons/io";

type StatCardType = {
  title: string;
  value: string;
  Icon: React.ElementType;
  colorIcon: string;
};

function StatCard({
  title,
  value,
  Icon,
  colorIcon = "text-green-600",
}: StatCardType) {
  return (
    <div className="bg-primary rounded-2xl p-6 shadow-sm w-full ">
      <div className="flex items-start gap-2 justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gray-50 ${colorIcon}`}>
          <Icon className={"size-6"} />
        </div>
        <div className="flex items-center gap-1 text-sm text-green-600">
          <IoIosTrendingUp className="size-4" />
          <span>+12.5%</span>
        </div>
      </div>
      <div>
        <h3 className="text-2xl font-semibold mb-1 break-all">{value}</h3>
        <p className="text-gray-600 text-sm">{title}</p>
      </div>
    </div>
  );
}

export default StatCard;
