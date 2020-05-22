import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, Modal, Text} from '@ui-kitten/components';

interface ModalInformation {
  title: string;
  description: string;
  buttonTitle: string;
  onClose: () => void;
}

export const ModalWithBackdrop = (
  props: ModalInformation,
): React.ReactElement => {
  const [visible, setVisible] = React.useState(true);

  const {title, description, buttonTitle, onClose} = props;

  const Header = () => <Text category="h6">{title}</Text>;
  const Footer = () => <Button onPress={onCloseModal}>{buttonTitle}</Button>;

  const onCloseModal = (): void => {
    setVisible(false);
    onClose();
  };

  return (
    <Modal
      style={styles.container}
      visible={visible}
      backdropStyle={styles.backdrop}>
      <Card header={Header} footer={Footer}>
        <Text category="s1">{description}</Text>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    // minHeight: 192,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
