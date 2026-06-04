import { describe, expect, it, vi } from "vitest";
import LoginModal from "./LoginModal";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// Mock the favorite context so `Heart` can render without the provider
vi.mock("../../contexts/AuthContext.jsx", () => ({
  useAuth: () => ({
    handleLogin: () => {},
    openSignup: () => {},
    closeAuthModal: () => {},
  }),
}));

describe("LoginModal validates required fields", () => {
  it("displays error message when email field is empty", async () => {
    render(<LoginModal />);
    const user = userEvent.setup();
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign In" });
    expect(submitButton).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();

    await user.click(emailInput);
    await user.click(passwordInput);
    await user.type(passwordInput, "1234567");
    await user.click(submitButton);
    const emailError = screen.getByText("Email is required.");
    expect(emailError).toBeInTheDocument();
  });
  it("displays error messages when password field is empty", async () => {
    render(<LoginModal />);
    const user = userEvent.setup();
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign In" });
    expect(submitButton).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    await user.type(emailInput, "valid-email@gmail.com");
    await user.click(passwordInput);
    await user.click(emailInput);
    await user.click(submitButton);
    const passwordError = screen.getByText("Password is required.");
    expect(passwordError).toBeInTheDocument();
  });
  it("displays error messages when email and password are invalid", async () => {
    render(<LoginModal />);
    const user = userEvent.setup();
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign In" });
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    await user.type(emailInput, "invalid-email");
    await user.type(passwordInput, "123");

    await user.click(submitButton);
    expect(submitButton).toBeDisabled();

    const emailError = screen.getByText("Email format is invalid.");
    const passwordError = screen.getByText(
      "Password does not meet the required format. Minimum 6 characters, alphanumeric only."
    );
    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });
});
