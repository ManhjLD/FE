function SearchFlights() {
  // const flights = [
  //   {
  //     route: "Hà Nội → TP.HCM",
  //     time: "08:00 - 10:10",
  //     price: "1.200.000đ",
  //   },
  //   {
  //     route: "Hà Nội → Đà Nẵng",
  //     time: "12:00 - 13:20",
  //     price: "850.000đ",
  //   },
  // ];

  return (
    <>
      {/* Hero Search Section */}
      <section className="relative min-h-[500px] flex items-center justify-center pt-xxl pb-xxl px-6 overflow-hidden bg-primary-container">
        <div className="absolute inset-0 z-0">
          <img
            alt="Vietnam Airways Aircraft"
            className="w-full h-full object-cover opacity-40"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXYUPqF71CE2inxfLrnHWqFisKNbswtP9qAq0lcqsl601ETPLJCY1byztuMohZqs9j605OzkH_4vaaUpIGWDxMo53TqpUA8lFQhvtRWCm0MCdpeXtqa7cX2zQVw3t4SBkZuhmXaHvRq014wx3dP852S6wreEWwJEgkVlP3DluBpFTqf4ex8GfGYkWlAQ-8KWnR6Rx6wBa_MMQYh1zMNS9A8d1qjDHzBAw2JZOY_jJGAERoT4fY_X-Xr2YxoRJ1XcBqrtImxNxzspid"
          />
        </div>

        <div className="relative z-10 w-full max-w-container-max mx-auto">
          <div className="mb-xl text-center md:text-left">
            <h1 className="font-h1 text-h1 text-white mb-sm">
              Khám phá thế giới cùng Vietnam Airways
            </h1>
            <p className="font-body-lg text-body-lg text-on-primary-container max-w-2xl text-white">
              Trải nghiệm dịch vụ đẳng cấp 4 sao trên mỗi chuyến bay của chúng
              tôi.
            </p>
          </div>

          {/* Flight Search Card */}
          <div className="bg-white rounded-xl shadow-2xl p-md md:p-xl grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-outline uppercase">
                Điểm khởi hành
              </label>
              <div className="flex items-center border border-outline-variant rounded-lg p-sm focus-within:border-secondary transition-all h-[56px]">
                <span className="material-symbols-outlined text-outline mr-2">
                  flight_takeoff
                </span>
                <input
                  className="w-full border-none focus:ring-0 text-body-md font-body-md text-primary"
                  type="text"
                  defaultValue="Hà Nội (HAN)"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-outline uppercase">
                Điểm đến
              </label>
              <div className="flex items-center border border-outline-variant rounded-lg p-sm focus-within:border-secondary transition-all h-[56px]">
                <span className="material-symbols-outlined text-outline mr-2">
                  flight_land
                </span>
                <input
                  className="w-full border-none focus:ring-0 text-body-md font-body-md text-primary"
                  placeholder="Bạn muốn đi đâu?"
                  type="text"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-outline uppercase">
                Ngày đi
              </label>

              <div className="flex items-center border border-outline-variant rounded-lg p-sm focus-within:border-secondary transition-all h-[56px]">
                <span className="material-symbols-outlined text-outline mr-2">
                  calendar_month
                </span>

                <input
                  className="w-full border-none focus:ring-0 text-body-md font-body-md text-primary bg-transparent"
                  type="date"
                />
              </div>
            </div>

            <button className="bg-[#ed8936] text-white h-[56px] rounded-lg font-button text-button shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined">search</span>
              Tìm chuyến bay
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default SearchFlights;
