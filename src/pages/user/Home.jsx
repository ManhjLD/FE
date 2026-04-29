import Navbar from "../../components/Navbar";
import FlightCard from "../../components/FlightCard";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section
        className="h-[620px] bg-cover bg-center flex items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05')"
        }}
      >
        <div className="container-main text-white">
          <h1 className="text-6xl font-bold mb-6 max-w-3xl">
            Khám phá thế giới cùng Vietnam Airways
          </h1>

          <p className="text-xl mb-10">
            Trải nghiệm hàng không đẳng cấp quốc tế
          </p>

          <div className="glass p-6 rounded-2xl max-w-5xl grid md:grid-cols-4 gap-4">
            <input className="p-4 rounded-xl border text-black" placeholder="Điểm đi" />
            <input className="p-4 rounded-xl border text-black" placeholder="Điểm đến" />
            <input className="p-4 rounded-xl border text-black" type="date" />
            <button className="btn-primary">
              Tìm chuyến bay
            </button>
          </div>
        </div>
      </section>

      {/* FLIGHTS */}
      <section className="container-main py-20">
        <h2 className="text-4xl font-bold mb-10">
          Chuyến bay nổi bật
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <FlightCard
            from="HAN"
            to="SGN"
            time="2h15m"
            price="1.200.000đ"
            image="https://images.unsplash.com/photo-1580674684081-7617fbf3d745"
          />

          <FlightCard
            from="HAN"
            to="DAD"
            time="1h20m"
            price="850.000đ"
            image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          />

          <FlightCard
            from="SGN"
            to="PQC"
            time="1h05m"
            price="2.150.000đ"
            image="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          />
        </div>
      </section>
    </>
  );
}