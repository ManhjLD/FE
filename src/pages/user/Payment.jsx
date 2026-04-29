import React from "react";

const Payment = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      
      {/* HEADER */}
      <header className="bg-white border-b border-outline-variant px-6 py-4">
        <h1 className="text-xl font-bold text-primary">
          Thanh toán vé máy bay
        </h1>
      </header>

      {/* CONTENT */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-slate-100 p-8">

          {/* TITLE */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-primary">
              Quét mã QR để thanh toán
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Sử dụng ứng dụng ngân hàng hoặc ví điện tử để quét mã
            </p>
          </div>

          {/* QR SECTION */}
          <div className="flex flex-col items-center gap-6">

            {/* QR IMAGE */}
            <div className="p-4 bg-white border rounded-xl shadow-sm">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=VietNamAirways-Payment-Order123"
                alt="QR Payment"
                className="w-[220px] h-[220px]"
              />
            </div>

            {/* INFO */}
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                Ngân hàng: <b>Vietcombank</b>
              </p>
              <p className="text-sm text-gray-600">
                Tên tài khoản: <b>VIETNAM AIRWAYS JSC</b>
              </p>
              <p className="text-sm text-gray-600">
                Nội dung: <b>PAY-ORDER-123</b>
              </p>
            </div>

            {/* AMOUNT */}
            <div className="text-center">
              <p className="text-gray-500 text-sm">Số tiền cần thanh toán</p>
              <p className="text-2xl font-bold text-orange-500">
                2.650.000 VND
              </p>
            </div>

            {/* BUTTON */}
            <button className="w-full max-w-xs bg-primary text-white py-3 rounded-lg hover:bg-primary-container transition">
              Tôi đã thanh toán
            </button>

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="text-center text-xs text-gray-400 py-4 border-t">
        © 2026 Vietnam Airways
      </footer>

    </div>
  );
};

export default Payment;