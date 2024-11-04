import { showMessage } from 'react-native-flash-message';

interface IShowFlashMessage {
  title?: string;
  message?: string;
  position?: 'top' | 'bottom' | 'center';
  duration?: number;
}

const success = ({
  title = 'Success',
  message = 'Success message',
  position = 'top',
  duration = 3000,
}: IShowFlashMessage) => {
  showMessage({ message: title, description: message, position, duration, type: 'success' });
};

const danger = ({
  title = 'Failed',
  message = 'Danger message',
  position = 'top',
  duration = 3000,
}: IShowFlashMessage) => {
  showMessage({ message: title, description: message, position, duration, type: 'danger' });
};

const warning = ({
  title = 'Warning',
  message = 'Warning message',
  position = 'top',
  duration = 3000,
}: IShowFlashMessage) => {
  showMessage({ message: title, description: message, position, duration, type: 'warning' });
};

const info = ({
  title = 'Info',
  message = 'Info message',
  position = 'top',
  duration = 3000,
}: IShowFlashMessage) => {
  showMessage({ message: title, description: message, position, duration, type: 'info' });
};

export const flashMessage = { success, danger, warning, info };
