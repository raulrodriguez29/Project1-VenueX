import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditVenue from "./EditVenue";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";

// --------------------
// API mocks
// --------------------
jest.mock("../../api/venue.api", () => ({
  updateVenue: jest.fn(),
  updateSeatSections: jest.fn(),
  deleteVenue: jest.fn(),
}));

// --------------------
// Layout component mocks (DEFAULT exports)
// --------------------
jest.mock("../../components/navbar/Navbar", () => ({
  __esModule: true,
  default: () => <div />,
}));

// --------------------
// Router navigation mock
// --------------------
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: "1" }),
}));

// --------------------
// Imports after mocks
// --------------------
import { updateVenue, updateSeatSections } from "../../api/venue.api";

describe("EditVenue (success case)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("updates venue and seat sections successfully", async () => {
    // --------------------
    // Arrange: mock API success
    // --------------------
    (updateVenue as jest.Mock).mockResolvedValue({});
    (updateSeatSections as jest.Mock).mockResolvedValue({});

    render(
      <MemoryRouter initialEntries={["/venues/edit/1"]}>
        <Routes>
          <Route path="/venues/edit/:id" element={<EditVenue />} />
        </Routes>
      </MemoryRouter>
    );

    // --------------------
    // Act: fill venue form
    // --------------------
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Updated Venue" },
    });
    fireEvent.change(screen.getByLabelText(/location/i), {
      target: { value: "Updated City" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Updated Description" },
    });

    fireEvent.click(screen.getByRole("button", { name: /update venue/i }));

    // --------------------
    // Assert: venue API success
    // --------------------
    await waitFor(() => {
      expect(updateVenue).toHaveBeenCalledWith(1, {
        name: "Updated Venue",
        location: "Updated City",
        description: "Updated Description",
      });
    });

    expect(screen.getByText(/venue updated successfully/i)).toBeInTheDocument();

    // --------------------
    // Act: fill seat sections form
    // --------------------
    const seatInputs = screen.getAllByRole("spinbutton"); // VIP, Premium, Floor, General

    fireEvent.change(seatInputs[0], { target: { value: "10" } }); // VIP
    fireEvent.change(seatInputs[1], { target: { value: "20" } }); // Premium
    fireEvent.change(seatInputs[2], { target: { value: "30" } }); // Floor
    fireEvent.change(seatInputs[3], { target: { value: "40" } }); // General

    fireEvent.click(screen.getByRole("button", { name: /update seat sections/i }));

    // --------------------
    // Assert: seat sections API success
    // --------------------
    await waitFor(() => {
      expect(updateSeatSections).toHaveBeenCalledWith(1, {
        VIP: 10,
        Premium: 20,
        Floor: 30,
        General: 40,
      });
    });

    expect(screen.getByText(/seat sections updated successfully/i)).toBeInTheDocument();
  });
});

it("shows error if venue update fails", async () => {
  // Arrange: make the API throw an error
  (updateVenue as jest.Mock).mockRejectedValue({
    response: { data: { message: "Failed to update" } },
  });

  render(
    <BrowserRouter>
      <EditVenue />
    </BrowserRouter>
  );

  // Fill form
  fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Test Venue" } });
  fireEvent.change(screen.getByLabelText(/location/i), { target: { value: "Test City" } });

  // Submit
  fireEvent.click(screen.getByRole("button", { name: /update venue/i }));

  // Assert error shows
  await waitFor(() => {
    expect(screen.getByText(/failed to update/i)).toBeInTheDocument();
  });
});
