import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SearchFlights from "./SearchFlights";
import FlightCard from "../../components/FlightCard";

export default function Home() {
  const flights = [
    {
      id: 1,
      fromCode: "HN",
      fromCity: "Hà Nội",
      toCode: "TP.HCM",
      toCity: "TP.HCM",
      duration: "2h 15m",
      time: "14:30 - 16:45",
      price: "1.200.000đ",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCsCN9gNiDLvdSfO8FWZnhEPx49C2JLahv6-jQiq_pOIdCLoK3dHCKfhMkBv5cOxSbwtER0ris8a242KvtKVQmG0gfnFd2OCEVSESCRQBqjm-3jD3GcUgQYxGG55AurrwkmIYxnT_xNqsbQAvdCCb4hL_hFQPA02QlH4UfVhfG6ibCb4zKcycfBbQq01ZvD_8o4RT8H79WReNqMNMcYEVM7ZT0aJXWYV4PNWQPDsHEB5jxKHc1euK3qVaDHwmI95M6zsu_9AQJ8Tbuk",
    },
    {
      id: 2,
      fromCode: "HN",
      fromCity: "Hà Nội",
      toCode: "ĐN",
      toCity: "Đà Nẵng",
      duration: "1h 20m",
      time: "08:15 - 09:35",
      price: "850.000đ",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBcaBhjAhFKoxS-JJdb5w57iZfqZlIa8EAol2gfYCCq2XLqoQV-bjyVs-d4ApN0-rJsOxIwmnvtOuGYCqlUNKizZc_4ELiUVHmihGYCmMHQIdPLCucJ7dkV5O2My_kOcYI_H1zTq9E8ZvIUf6YN9YduTcSNtDTrzYteR6T8Vg9xSDANnqSEAK1Tgvus9uCw_njyyzZbXBAWx3N8TBDNw4sZypoWnhCv8LNojvdiUR3WvPMV4YGPRa1lyHMjTXNyzcpU39urE1wNm4QK",
    },
    {
      id: 3,
      fromCode: "TP.HCM",
      fromCity: "TP.HCM",
      toCode: "TT",
      toCity: "Huế",
      duration: "1h 05m",
      time: "11:00 - 12:05",
      price: "2.150.000đ",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCsCN9gNiDLvdSfO8FWZnhEPx49C2JLahv6-jQiq_pOIdCLoK3dHCKfhMkBv5cOxSbwtER0ris8a242KvtKVQmG0gfnFd2OCEVSESCRQBqjm-3jD3GcUgQYxGG55AurrwkmIYxnT_xNqsbQAvdCCb4hL_hFQPA02QlH4UfVhfG6ibCb4zKcycfBbQq01ZvD_8o4RT8H79WReNqMNMcYEVM7ZT0aJXWYV4PNWQPDsHEB5jxKHc1euK3qVaDHwmI95M6zsu_9AQJ8Tbuk",
    },
  ];

  return (
    <>
      <Navbar />

      <main>
        <SearchFlights />

        {/* Featured Flights Section */}
        <section className="max-w-container-max mx-auto px-6 py-xxl">
          <div className="flex justify-between items-end mb-xl">
            <div>
              <h2 className="font-h2 text-h2 text-primary">
                Chuyến bay nổi bật
              </h2>
              <p className="font-body-md text-body-md text-outline mt-xs">
                Những hành trình phổ biến nhất trong tuần này
              </p>
            </div>
            <button className="flex items-center gap-2 text-secondary font-button text-button hover:underline">
              Xem tất cả
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {flights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        </section>

        {/* Perks */}
        <section className="bg-surface-container py-xxl">
          <div className="max-w-container-max mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-xl">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-md shadow-sm">
                <span className="material-symbols-outlined text-primary text-3xl">
                  verified_user
                </span>
              </div>
              <h4 className="font-h3 text-[18px] text-primary mb-xs">
                An tâm tuyệt đối
              </h4>
              <p className="font-body-sm text-body-sm text-outline">
                Bảo mật thông tin và thanh toán theo tiêu chuẩn quốc tế.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-md shadow-sm">
                <span className="material-symbols-outlined text-primary text-3xl">
                  support_agent
                </span>
              </div>
              <h4 className="font-h3 text-[18px] text-primary mb-xs">
                Hỗ trợ 24/7
              </h4>
              <p className="font-body-sm text-body-sm text-outline">
                Đội ngũ chuyên nghiệp luôn sẵn sàng hỗ trợ bạn mọi lúc.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-md shadow-sm">
                <span className="material-symbols-outlined text-primary text-3xl">
                  redeem
                </span>
              </div>
              <h4 className="font-h3 text-[18px] text-primary mb-xs">
                Ưu đãi Lotusmiles
              </h4>
              <p className="font-body-sm text-body-sm text-outline">
                Tích lũy dặm bay và đổi hàng ngàn quà tặng hấp dẫn.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-md shadow-sm">
                <span className="material-symbols-outlined text-primary text-3xl">
                  stars
                </span>
              </div>
              <h4 className="font-h3 text-[18px] text-primary mb-xs">
                Dịch vụ 4 sao
              </h4>
              <p className="font-body-sm text-body-sm text-outline">
                Trải nghiệm dịch vụ hàng không hàng đầu khu vực.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
