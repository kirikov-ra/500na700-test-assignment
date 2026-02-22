import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { FeedbackForm } from './FeedbackForm';
import '@testing-library/jest-dom';

describe('FeedbackForm Component', () => {
  afterEach(cleanup);

  it('должен рендерить все поля формы', () => {
    render(<FeedbackForm />);
    expect(screen.getByLabelText(/Имя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Телефон/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Я согласен/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Отправить/i })).toBeInTheDocument();
  });

  it('должен показывать ошибки валидации при пустой отправке', () => {
    render(<FeedbackForm />);
    const submitBtn = screen.getByRole('button', { name: /Отправить/i });

    fireEvent.click(submitBtn);

    expect(screen.getByText(/Имя обязательно/i)).toBeInTheDocument();
    expect(screen.getByText(/Email обязателен/i)).toBeInTheDocument();
    expect(screen.getByText(/Телефон обязателен/i)).toBeInTheDocument();
    expect(screen.getByText(/Необходимо согласие на обработку/i)).toBeInTheDocument();
  });

  it('должен корректно накладывать маску на номер телефона', () => {
    render(<FeedbackForm />);
    const phoneInput = screen.getByLabelText(/Телефон/i) as HTMLInputElement;

    fireEvent.change(phoneInput, { target: { value: '9001234567' } });

    expect(phoneInput.value).toBe('+7 (900) 123-45-67');
  });

  it('должен показывать сообщение об успехе при валидных данных', () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<FeedbackForm />);

    fireEvent.change(screen.getByLabelText(/Имя/i), { target: { value: 'Иван' } });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@test.ru' },
    });
    fireEvent.change(screen.getByLabelText(/Телефон/i), {
      target: { value: '9001112233' },
    });

    const consentCheckbox = screen.getByLabelText(/Я согласен/i);
    fireEvent.click(consentCheckbox);

    fireEvent.click(screen.getByRole('button', { name: /Отправить/i }));

    expect(screen.getByText(/Спасибо! Ваше сообщение отправлено/i)).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });
});
