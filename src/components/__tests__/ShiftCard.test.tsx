import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ShiftCard from '../ShiftCard';
import type { Shift } from '@/lib/api/shifts';

const mockShift: Shift = {
    id: 1,
    job_id: 1,
    professional_user_id: 1,
    application_id: 1,
    scheduled_start: '2025-12-01T18:00:00',
    scheduled_end: '2025-12-01T23:00:00',
    status: 'scheduled',
    created_at: '2025-11-24',
    updated_at: '2025-11-24',
    job: {
        id: 1,
        title: 'Bartender para Evento',
        category: 'Bartender',
        location: 'São Paulo - SP',
        rate: 50,
        rate_type: 'Hourly',
    },
};

describe('ShiftCard', () => {
    it('should render shift information correctly', () => {
        render(<ShiftCard shift={mockShift} />);

        expect(screen.getByText('Bartender para Evento')).toBeInTheDocument();
        expect(screen.getByText('Bartender')).toBeInTheDocument();
        expect(screen.getByText('São Paulo - SP')).toBeInTheDocument();
        expect(screen.getByText(/R\$ 50\.00/)).toBeInTheDocument();
    });

    it('should display scheduled status', () => {
        render(<ShiftCard shift={mockShift} />);

        expect(screen.getByText('Agendado')).toBeInTheDocument();
    });

    it('should show check-in button for scheduled shifts', () => {
        const onCheckIn = jest.fn();
        render(<ShiftCard shift={mockShift} onCheckIn={onCheckIn} />);

        const checkInButton = screen.getByRole('button', { name: /fazer check-in/i });
        expect(checkInButton).toBeInTheDocument();
    });

    it('should call onCheckIn when check-in button is clicked', () => {
        const onCheckIn = jest.fn();
        render(<ShiftCard shift={mockShift} onCheckIn={onCheckIn} />);

        const checkInButton = screen.getByRole('button', { name: /fazer check-in/i });
        fireEvent.click(checkInButton);

        expect(onCheckIn).toHaveBeenCalledWith(1);
    });

    it('should show check-out button for in_progress shifts', () => {
        const inProgressShift = { ...mockShift, status: 'in_progress' as const };
        const onCheckOut = jest.fn();
        render(<ShiftCard shift={inProgressShift} onCheckOut={onCheckOut} />);

        const checkOutButton = screen.getByRole('button', { name: /fazer check-out/i });
        expect(checkOutButton).toBeInTheDocument();
    });

    it('should display confirmed hours for completed shifts', () => {
        const completedShift = {
            ...mockShift,
            status: 'completed' as const,
            confirmed_hours: 5,
        };
        render(<ShiftCard shift={completedShift} />);

        expect(screen.getByText(/5h trabalhadas/)).toBeInTheDocument();
    });

    it('should not show action buttons when showActions is false', () => {
        const onCheckIn = jest.fn();
        render(<ShiftCard shift={mockShift} onCheckIn={onCheckIn} showActions={false} />);

        const checkInButton = screen.queryByRole('button', { name: /fazer check-in/i });
        expect(checkInButton).not.toBeInTheDocument();
    });

    it('should display actual times when available', () => {
        const shiftWithActualTimes = {
            ...mockShift,
            actual_start: '2025-12-01T18:05:00',
            actual_end: '2025-12-01T23:10:00',
        };
        render(<ShiftCard shift={shiftWithActualTimes} />);

        expect(screen.getByText(/Horários Reais/)).toBeInTheDocument();
    });
});
