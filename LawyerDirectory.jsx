import React, { useState } from "react";

const lawyers = [
  {
    id: 1,
    name: "Peter Kasanda",
    firm: "Clyde & Co Tanzania",
    email: "peter.kasanda@example.com",
    phone: "+255123456789",
  },
  {
    id: 2,
    name: "Lilian Kiefer",
    firm: "Corpus Legal Practitioners",
    email: "lilian.kiefer@example.com",
    phone: "+260987654321",
  },
];

export default function LawyerDirectory() {
  const [unlocked, setUnlocked] = useState({});

  const handlePay = (lawyerId) => {
    const handler = window.PaystackPop.setup({
      key: "pk_test_2c37e982de7cd79efca8c7161a71b03ed3b57b82",
      email: "customer@example.com",
      amount: 1000 * 100,
      currency: "ZAR",
      callback: function () {
        setUnlocked((prev) => ({ ...prev, [lawyerId]: true }));
        alert("Payment complete. Unlocking contact.");
      },
      onClose: function () {
        alert("Payment cancelled");
      },
    });

    handler.openIframe();
  };

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Top Lawyers</h1>
      {lawyers.map((lawyer) => (
        <div
          key={lawyer.id}
          className="border rounded-2xl p-4 shadow-md bg-white space-y-2"
        >
          <h2 className="text-xl font-semibold">{lawyer.name}</h2>
          <p className="text-gray-700">{lawyer.firm}</p>
          {unlocked[lawyer.id] ? (
            <div className="space-x-4 mt-2">
              <a
                href={`mailto:${lawyer.email}`}
                className="text-blue-600 underline"
              >
                📧 Email
              </a>
              <a href={`tel:${lawyer.phone}`} className="text-green-600 underline">
                📞 Call
              </a>
            </div>
          ) : (
            <button
              onClick={() => handlePay(lawyer.id)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow"
            >
              Unlock Contact
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
