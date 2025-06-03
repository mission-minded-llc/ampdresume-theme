import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import { Summary } from './Summary';
import { User } from '@/types';

// Mock user data
const mockUser: User = {
    id: '1',
    name: 'John Doe',
    displayEmail: 'john@example.com',
    location: 'San Francisco, CA',
    title: 'Software Engineer',
    summary: 'Experienced software engineer with 5+ years in full-stack development.'
}

const mockUserWithLongSummary: User = {
    ...mockUser,
    summary: 'A'.repeat(3000), // 3000 characters to test truncation
};

const mockUserWithEmptySummary: User = {
    ...mockUser,
    summary: '   ', // whitespace only
};

const mockUserWithNoSummary: User = {
    ...mockUser,
    summary: undefined,
};

// Helper function to render with theme
const renderWithTheme = (component: React.ReactElement, mode: 'light' | 'dark' = 'light') => {
    const theme = createTheme({
        palette: {
            mode,
        },
    });
    
    return render(
        <ThemeProvider theme={theme}>
            {component}
        </ThemeProvider>
    );
};

describe('Summary Component', () => {
    describe('Rendering Conditions', () => {
        it('should render nothing when no user is provided', () => {
            const { container } = renderWithTheme(<Summary />);
            expect(container.firstChild).toBeNull();
        });

        it('should render nothing when user has no summary', () => {
            const { container } = renderWithTheme(<Summary user={mockUserWithNoSummary} />);
            expect(container.firstChild).toBeNull();
        });

        it('should render nothing when user summary is only whitespace', () => {
            const { container } = renderWithTheme(<Summary user={mockUserWithEmptySummary} />);
            expect(container.firstChild).toBeNull();
        });

        it('should render summary when user has valid summary text', () => {
            renderWithTheme(<Summary user={mockUser} />);
            
            expect(screen.getByText('Summary')).toBeInTheDocument();
            expect(screen.getByText(mockUser.summary!)).toBeInTheDocument();
        });
    });

    describe('Content Display', () => {
        it('should display the summary heading', () => {
            renderWithTheme(<Summary user={mockUser} />);
            
            const heading = screen.getByRole('heading', { name: 'Summary' });
            expect(heading).toBeInTheDocument();
            expect(heading.tagName).toBe('H2');
        });

        it('should display the full summary text when under 2500 characters', () => {
            renderWithTheme(<Summary user={mockUser} />);
            
            expect(screen.getByText(mockUser.summary!)).toBeInTheDocument();
        });

        it('should truncate summary text when over 2500 characters', () => {
            renderWithTheme(<Summary user={mockUserWithLongSummary} />);
            
            const expectedText = 'A'.repeat(2499);
            expect(screen.getByText(expectedText)).toBeInTheDocument();
            expect(screen.queryByText('A'.repeat(3000))).not.toBeInTheDocument();
        });
    });

    describe('Styling and Theme', () => {
        it('should apply correct styles for light theme', () => {
            renderWithTheme(<Summary user={mockUser} />, 'light');
            
            const summaryText = screen.getByText(mockUser.summary!);
            const computedStyle = window.getComputedStyle(summaryText);
            
            // Note: These exact color values might need adjustment based on your theme implementation
            expect(computedStyle.textAlign).toBe('justify');
            expect(computedStyle.lineHeight).toBe('1.6');
        });

        it('should apply correct styles for dark theme', () => {
            renderWithTheme(<Summary user={mockUser} />, 'dark');
            
            const summaryText = screen.getByText(mockUser.summary!);
            const computedStyle = window.getComputedStyle(summaryText);
            
            expect(computedStyle.textAlign).toBe('justify');
            expect(computedStyle.lineHeight).toBe('1.6');
        });
    });

    describe('Accessibility', () => {
        it('should have proper heading hierarchy', () => {
            renderWithTheme(<Summary user={mockUser} />);
            
            const heading = screen.getByRole('heading', { level: 2 });
            expect(heading).toBeInTheDocument();
            expect(heading).toHaveTextContent('Summary');
        });

        it('should have accessible text content', () => {
            renderWithTheme(<Summary user={mockUser} />);
            
            const summaryText = screen.getByText(mockUser.summary!);
            expect(summaryText).toBeInTheDocument();
            expect(summaryText.tagName).toBe('P'); // Typography with variant="body1" renders as p
        });
    });

    describe('Layout and Structure', () => {
        it('should have proper spacing and layout structure', () => {
            const { container } = renderWithTheme(<Summary user={mockUser} />);
            
            // Check that the main container exists
            const mainBox = container.firstChild;
            expect(mainBox).toBeInTheDocument();
            
            // Check that heading and text are both present
            expect(screen.getByText('Summary')).toBeInTheDocument();
            expect(screen.getByText(mockUser.summary!)).toBeInTheDocument();
        });
    });
});