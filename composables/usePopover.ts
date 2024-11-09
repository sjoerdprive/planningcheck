export const usePopover = () => {
  const key = useId();
  const isVisible = useState(key, () => false);

  function open() {
    isVisible.value = true;
  }

  function close() {
    isVisible.value = false;
  }

  function toggle() {
    isVisible.value = !isVisible.value;
  }

  return { open, close, toggle, isVisible };
};
