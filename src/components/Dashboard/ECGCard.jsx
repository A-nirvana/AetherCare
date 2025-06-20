const ECGCard = () => {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">ECG Monitoring</h2>
        <div className="text-sm text-gray-600 mb-2">
          ECG signal looks normal. Last checked: 5 minutes ago.
        </div>
        <div className="bg-gray-100 rounded-lg h-24 flex items-center justify-center text-gray-400 text-sm">
          [ECG Chart Placeholder]
        </div>
      </div>
    );
  };

  export default ECGCard;
