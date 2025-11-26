import React from 'react';
import { render, screen } from '@testing-library/react';
import JobCard from '../JobCard';
import type { Job } from '@/lib/api/jobs';

const mockJob: Job = {
    id: 1,
    establishment_user_id: 1,
    title: 'Bartender para Evento',
    description: 'Procuramos bartender experiente',
    category: 'Bartender',
    rate: 50,
    rate_type: 'Hourly',
    location: 'São Paulo - SP',
    date: '2025-12-01',
    start_time: '18:00:00',
    end_time: '23:00:00',
    slots_available: 2,
    slots_filled: 0,
    status: 'open',
    created_at: '2025-11-24',
    updated_at: '2025-11-24',
    establishment: {
        id: 1,
        user_id: 1,
        company_name: 'Bar do João',
        average_rating: 4.5,
    },
};

describe('JobCard', () => {
    it('should render job information correctly', () => {
        render(<JobCard job={mockJob} />);

        expect(screen.getByText('Bartender para Evento')).toBeInTheDocument();
        expect(screen.getByText('Bartender')).toBeInTheDocument();
        expect(screen.getByText('Bar do João')).toBeInTheDocument();
        expect(screen.getByText('São Paulo - SP')).toBeInTheDocument();
        expect(screen.getByText(/R\$ 50\.00/)).toBeInTheDocument();
    });

    it('should display available slots', () => {
        render(<JobCard job={mockJob} />);

        expect(screen.getByText(/2 vagas disponíveis/)).toBeInTheDocument();
    });

    it('should show establishment rating when available', () => {
        render(<JobCard job={mockJob} />);

        expect(screen.getByText('4.5')).toBeInTheDocument();
    });

    it('should render apply button when onApply is provided', () => {
        const onApply = jest.fn();
        render(<JobCard job={mockJob} onApply={onApply} />);

        const applyButton = screen.getByRole('button', { name: /candidatar/i });
        expect(applyButton).toBeInTheDocument();
    });

    it('should not render apply button when showActions is false', () => {
        render(<JobCard job={mockJob} showActions={false} />);

        const applyButton = screen.queryByRole('button', { name: /candidatar/i });
        expect(applyButton).not.toBeInTheDocument();
    });

    it('should display closed status correctly', () => {
        const closedJob = { ...mockJob, status: 'closed' as const };
        render(<JobCard job={closedJob} />);

        expect(screen.getByText('Fechada')).toBeInTheDocument();
    });

    it('should not show apply button when no slots available', () => {
        const fullJob = { ...mockJob, slots_filled: 2 };
        const onApply = jest.fn();
        render(<JobCard job={fullJob} onApply={onApply} />);

        const applyButton = screen.queryByRole('button', { name: /candidatar/i });
        expect(applyButton).not.toBeInTheDocument();
    });

    it('should format date and time correctly', () => {
        render(<JobCard job={mockJob} />);

        // Check if date is formatted (01 de dez or similar)
        expect(screen.getByText(/01/)).toBeInTheDocument();
        // Check if time is formatted (18:00 - 23:00)
        expect(screen.getByText(/18:00 - 23:00/)).toBeInTheDocument();
    });
});
