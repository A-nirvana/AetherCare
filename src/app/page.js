import Sidebar from "../app/components/Sidebar";
import Header from "../app/components/Dashboard/Header";
import HealthScore from "../app/components/Dashboard/HealthScore";
import VitalCard from "../app/components/Dashboard/VitalCard";
import ClimateCard from "../app/components/Dashboard/ClimateCard";
import ECGCard from "../app/components/Dashboard/ECGCard";
import DoctorTipsWeb from '../app/components/Dashboard/DoctorTipsWeb';
import BotpressChat from "../app/components/Dashboard/webchat";
export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <Header />
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-4">
            <HealthScore />
            <VitalCard />
          </div>
            <ClimateCard />
          </div>
          <div className="w-full lg:w-1/3">
      </div>
      <DoctorTipsWeb className=""/>
      <BotpressChat />
      </div>

    </div>
  );
}
