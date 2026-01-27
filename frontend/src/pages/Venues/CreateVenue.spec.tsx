import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreateVenue from "./CreateVenue";
import { BrowserRouter } from "react-router-dom";

// --------------------
// API mocks
// --------------------
jest.mock("../../api/venue.api", () => ({
  createVenue: jest.fn(),
  createSeatSections: jest.fn(),
}));

// --------------------
// Layout component mocks (default exports)
// --------------------
jest.mock("../../components/navbar/Navbar", () => ({
  __esModule: true,
  default: () => <div />,
}));

jest.mock("../../components/Footer", () => ({
  __esModule: true,
  default: () => <div />,
}));

jest.mock("../../components/Blank", () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>,
}));

// --------------------
// Router mock
// --------------------
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// --------------------
// Imports AFTER mocks
// --------------------
import { createVenue, createSeatSections } from "../../api/venue.api";

describe("CreateVenue component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("creates venue and seat sections successfully", async () => {
    // Mock success API responses
    (createVenue as jest.Mock).mockResolvedValue({
      data: { id: 1, name: "Test Venue", location: "Test City", description: "Test Description" },
    });
    (createSeatSections as jest.Mock).mockResolvedValue({});

    render(
      <BrowserRouter>
        <CreateVenue />
      </BrowserRouter>
    );

    // Fill venue form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Test Venue" } });
    fireEvent.change(screen.getByLabelText(/location/i), { target: { value: "Test City" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Test Description" } });

    // Submit venue form
    fireEvent.click(screen.getByRole("button", { name: /create venue/i }));

    // Wait for seat section form
    await waitFor(() => expect(screen.getByText(/seat sections for test venue/i)).toBeInTheDocument());

    // Fill seat sections
    const seatInputs = screen.getAllByRole("spinbutton");
    fireEvent.change(seatInputs[0], { target: { value: "10" } }); // VIP
    fireEvent.change(seatInputs[1], { target: { value: "20" } }); // Premium
    fireEvent.change(seatInputs[2], { target: { value: "30" } }); // Floor
    fireEvent.change(seatInputs[3], { target: { value: "40" } }); // General

    // Submit seat sections
    fireEvent.click(screen.getByRole("button", { name: /create seat sections/i }));

    // Assert API calls
    await waitFor(() => {
      expect(createVenue).toHaveBeenCalledTimes(1);
      expect(createSeatSections).toHaveBeenCalledWith(1, [
        { type: "VIP", capacity: 10 },
        { type: "Premium", capacity: 20 },
        { type: "Floor", capacity: 30 },
        { type: "General", capacity: 40 },
      ]);
    });

    // Assert navigation
    expect(mockNavigate).toHaveBeenCalledWith("/venues");
  });

  beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});
  it("shows error message if venue creation fails", async () => {
    // Mock failure of venue creation
    (createVenue as jest.Mock).mockRejectedValue({
      response: { data: { message: "Failed to create venue" } },
    });

    render(
      <BrowserRouter>
        <CreateVenue />
      </BrowserRouter>
    );

    // Fill venue form
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "Fail Venue" } });
    fireEvent.change(screen.getByLabelText(/location/i), { target: { value: "Fail City" } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: "Fail Desc" } });

    // Submit venue form
    fireEvent.click(screen.getByRole("button", { name: /create venue/i }));

    // Assert error message
    await waitFor(() =>
      expect(screen.getByText(/failed to create venue/i)).toBeInTheDocument()
    );

    // Seat sections API should not cause errors
    expect(createSeatSections).not.toHaveBeenCalled();

    // Navigation should not happen
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
