import { render, screen } from '@testing-library/react';
import Home from '../page';
import '@testing-library/jest-dom';
import { useAuth } from '@clerk/nextjs';


jest.mock('@clerk/nextjs', () => ({
  UserButton: () => <div data-testid="user-button">User Button</div>,
  SignInButton: () => <div data-testid="sign-in-button">Sign In</div>,
  SignedOut: ({ children }) => <div data-testid="signed-out">{children}</div>,
  SignedIn: ({ children }) => <div data-testid="signed-in">{children}</div>,
  useAuth: jest.fn()
}));

describe('Home Component', () => {
  it('should render SignInButton when user is signed out', () => {
    useAuth.mockReturnValue({ isSignedIn: false });

    render(<Home />);
    
    expect(screen.getByTestId('signed-out')).toBeInTheDocument();
    expect(screen.getByTestId('sign-in-button')).toBeInTheDocument();
  });

  it('should render UserButton when user is signed in', () => {
    
    useAuth.mockReturnValue({ isSignedIn: true });

    render(<Home />);
    
    expect(screen.getByTestId('signed-in')).toBeInTheDocument();
    expect(screen.getByTestId('user-button')).toBeInTheDocument();
  });
}); 