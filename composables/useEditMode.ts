export const useEditMode = () => {
  const isEditable = useState("isEditable", () => false);

  return { isEditable };
};
