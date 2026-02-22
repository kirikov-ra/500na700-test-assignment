import { ChangeEvent, SubmitEvent, useState } from 'react';
import styles from './FeedbackForm.module.scss';
import { Input } from '@/shared/ui/Input/Input';
import { formatPhoneMask, isValidEmail } from '@/shared/ui/utils/validators';
import { Button } from '@/shared/ui/Button/Button';

interface FeedbackFormData {
  name: string;
  email: string;
  phone: string;
  consent: boolean;
}

type FeedbackFormErrors = Partial<Record<keyof FeedbackFormData, string>>;

const initialFormData: FeedbackFormData = {
  name: '',
  email: '',
  phone: '',
  consent: false,
};

export const FeedbackForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<FeedbackFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getValidationErrors = (): FeedbackFormErrors => {
    const newErrors: FeedbackFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Некорректный формат email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Телефон обязателен';
    } else if (formData.phone.length !== 18) {
      newErrors.phone = 'Введите номер полностью';
    }
    if (!formData.consent) {
      newErrors.consent = 'Необходимо согласие на обработку персональных данных';
    }

    return newErrors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'phone' ? formatPhoneMask(value) : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setIsSubmitted(false);
  };

  const handleConsentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, consent: e.target.checked }));
    setErrors((prev) => ({ ...prev, consent: undefined }));
    setIsSubmitted(false);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = getValidationErrors();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <div className={styles['feedback-form']}>
      <h2 className={styles.title}>Связаться с нами</h2>

      {isSubmitted && (
        <div className={styles.success}>Спасибо! Ваше сообщение отправлено.</div>
      )}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          label="Имя"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        <Input
          label="Телефон"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <div className={styles.consent}>
          <label className={styles['checkbox-label']}>
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={handleConsentChange}
              className={styles['checkbox-input']}
            />
            <span className={styles['checkbox-custom']} />Я согласен (-а) на обработку
            персональных данных
          </label>

          {errors.consent && (
            <span className={styles['consent-error']}>{errors.consent}</span>
          )}
        </div>

        <Button type="submit" color="black">
          Отправить
        </Button>
      </form>
    </div>
  );
};
