import LifeScanTitle from "../../components/ui/LifeScanTitle";

const Homepage = () => {
    return (
        <div className="flex-1 p-9">
            <div className="flex items-center justify-center">
                <LifeScanTitle size="text-5xl" />
            </div>
            <div className="mt-10 bg-slate-800 rounded-xl">
                <img src="../logo.png" alt="Logo de LifeScan" className="w-80 h-80 mx-auto mt-4" />
            </div>
        </div>
    );
};

export default Homepage; 