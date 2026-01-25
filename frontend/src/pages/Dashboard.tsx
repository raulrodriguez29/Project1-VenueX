import Navbar from "../components/navbar/Navbar";
import Blank from "../components/Blank";
import Footer from "../components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <Blank>
        <>
  <div className="lg:col-span-1">
    <div className="bg-white rounded-2xl card-shadow p-6 md:p-8">
      {/* Profile Photo */}
      <div className="flex flex-col items-center">
        <div className="profile-ring rounded-full mb-4">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z" />
            </svg>
          </div>
        </div>
        {/* Status Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="status-dot w-2 h-2 bg-emerald-500 rounded-full" />{" "}
          <span className="text-xs text-emerald-600 font-medium uppercase tracking-wide">
            User
          </span>
        </div>
        {/* Name & Role */}
        <div
          id="name-display"
          className="flex items-center gap-2 justify-center"
        >
          <h2
            id="user-name"
            className="font-body text-xl md:text-2xl font-semibold primary-text text-center"
          >
            Alexandra Chen
          </h2>
          <button
            //onClick="editName()"
            className="p-1 hover:bg-red-50 rounded transition-colors"
            title="Edit name"
          >
            <svg
              className="w-4 h-4 text-gray-400 hover:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
        </div>
        <div
          id="name-edit"
          className="hidden flex flex-col gap-2 mt-2 w-full px-4"
        >
          <div className="flex gap-2">
            <input
              type="text"
              id="first-name-input"
              placeholder="First name"
              className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-red-300"
              defaultValue="Alexandra"
            />{" "}
            <input
              type="text"
              id="last-name-input"
              placeholder="Last name"
              className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:border-red-300"
              defaultValue="Chen"
            />
          </div>
          <div className="flex gap-2 justify-center">
            <button
              //onClick="saveName()"
              className="px-3 py-1.5 text-xs font-medium primary-bg text-white rounded hover:opacity-90"
            >
              Save
            </button>{" "}
            <button
              //onClick="cancelName()"
              className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="my-6 border-t border-gray-100" />
      {/* Contact Info */}
      <div className="space-y-4">
        {/* Email */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5"
              style={{ color: "#ff6699" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
              Email
            </p>
            <div id="email-display" className="flex items-center gap-2">
              <p id="user-email" className="text-gray-700 text-sm truncate">
                alexandra.chen@email.com
              </p>
              <button
                //onClick="editEmail()"
                className="p-1 hover:bg-red-50 rounded transition-colors"
                title="Edit email"
              >
                <svg
                  className="w-4 h-4 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </div>
            <div
              id="email-edit"
              className="hidden flex items-center gap-2 mt-1"
            >
              <input
                type="email"
                id="email-input"
                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-red-300"
                defaultValue="alexandra.chen@email.com"
              />{" "}
              <button
                //onClick="saveEmail()"
                className="px-2 py-1 text-xs font-medium primary-bg text-white rounded hover:opacity-90"
              >
                Save
              </button>{" "}
              <button
                //onClick="cancelEmail()"
                className="px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        {/* Phone */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5"
              style={{ color: "#ff6699" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
              Phone
            </p>
            <div id="phone-display" className="flex items-center gap-2">
              <p id="user-phone" className="text-gray-700 text-sm">
                +1 (555) 123-4567
              </p>
              <button
                //onClick="editPhone()"
                className="p-1 hover:bg-red-50 rounded transition-colors"
                title="Edit phone"
              >
                <svg
                  className="w-4 h-4 text-gray-400 hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </button>
            </div>
            <div
              id="phone-edit"
              className="hidden flex items-center gap-2 mt-1"
            >
              <input
                type="tel"
                id="phone-input"
                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-red-300"
                defaultValue="+1 (555) 123-4567"
              />{" "}
              <button
                //onClick="savePhone()"
                className="px-2 py-1 text-xs font-medium primary-bg text-white rounded hover:opacity-90"
              >
                Save
              </button>{" "}
              <button
                //onClick="cancelPhone()"
                className="px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold primary-text">12</p>
          <p className="text-xs text-gray-500 mt-1">Total Bookings</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold primary-text">3</p>
          <p className="text-xs text-gray-500 mt-1">Upcoming</p>
        </div>
      </div>
    </div>
  </div>
  <div className="pt-8"></div>
  {/* Booking History */}
  <div className="lg:col-span-2">
    <div className="bg-white rounded-2xl card-shadow p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3
          id="bookings-title"
          className="font-body text-xl font-semibold primary-text"
        >
          Booking History
        </h3>
      </div>
      {/* Tickets List */}
      <div className="space-y-4">
        {/* Ticket 1 - Upcoming */}
        <div className="booking-card bg-gradient-to-r from-white to-red-50 border border-gray-100 rounded-xl p-4 md:p-5">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 primary-bg rounded-xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-gray-800">
                    Broadway Musical - The Phantom
                  </h4>
                  <span className="px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
                    Upcoming
                  </span>
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  Dec 28, 2024 • 7:30 PM �� 2 tickets
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 md:flex-col md:items-end">
              <p className="font-display font-semibold primary-text text-lg">
                $189.00
              </p>
              <span className="text-xs text-gray-400">Seat: A12, A13</span>
            </div>
            <button //onClick="showTicketMessage()" 
                className="px-4 py-2 text-sm font-medium primary-bg text-white rounded-lg hover:opacity-90 transition-opacity"> 
                Get Tickets </button>
          </div>
        </div>
        {/* Ticket 2 - Upcoming */}
        <div className="ticket-card bg-gradient-to-r from-white to-red-50 border border-gray-100 rounded-xl p-4 md:p-5">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 primary-bg rounded-xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                  />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-gray-800">
                    Cinema Premiere - Midnight Sky
                  </h4>
                  <span className="px-2 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full">
                    Upcoming
                  </span>
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  Jan 5, 2025 • 9:00 PM • 4 tickets
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 md:flex-col md:items-end">
              <p className="font-display font-semibold primary-text text-lg">
                $68.00
              </p>
              <span className="text-xs text-gray-400">Seat: H5-H8</span>
            </div>
          </div>
        </div>
        {/* Ticket 3 - Past */}
        <div className="ticket-card bg-white border border-gray-100 rounded-xl p-4 md:p-5 opacity-75">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-gray-600">
                    Jazz Night - Blue Note Festival
                  </h4>
                  <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-500 rounded-full">
                    Completed
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-1">
                  Nov 15, 2024 • 8:00 PM • 2 tickets
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 md:flex-col md:items-end">
              <p className="font-display font-semibold text-gray-500 text-lg">
                $120.00
              </p>
              <span className="text-xs text-gray-400">Seat: VIP 3, VIP 4</span>
            </div>
          </div>
        </div>
        {/* Ticket 4 - Past */}
        <div className="ticket-card bg-white border border-gray-100 rounded-xl p-4 md:p-5 opacity-75">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-gray-600">
                    Comedy Night - Stand Up Stars
                  </h4>
                  <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-500 rounded-full">
                    Completed
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-1">
                  Oct 22, 2024 • 9:30 PM • 1 ticket
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 md:flex-col md:items-end">
              <p className="font-display font-semibold text-gray-500 text-lg">
                $45.00
              </p>
              <span className="text-xs text-gray-400">Seat: F7</span>
            </div>
          </div>
        </div>
        {/* Ticket 5 - Past */}
        <div className="ticket-card bg-white border border-gray-100 rounded-xl p-4 md:p-5 opacity-75">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-semibold text-gray-600">
                    Sports - Championship Finals
                  </h4>
                  <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-500 rounded-full">
                    Completed
                  </span>
                </div>
                <p className="text-gray-400 text-sm mt-1">
                  Sep 8, 2024 • 3:00 PM • 2 tickets
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 md:flex-col md:items-end">
              <p className="font-display font-semibold text-gray-500 text-lg">
                $275.00
              </p>
              <span className="text-xs text-gray-400">Seat: C21, C22</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

      </Blank>
      <Footer />
    </>
  )
}