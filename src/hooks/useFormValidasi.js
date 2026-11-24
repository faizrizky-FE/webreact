import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function useFormValidasi(schema, onSubmit) {
  const [berhasil, setBerhasil] = useState(false);
  const [gagal, setGagal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submitForm = handleSubmit(async (data) => {
    setBerhasil(false);
    setGagal(false);

    try {
      await onSubmit(data);
      reset();
      setBerhasil(true);
    } catch {
      setGagal(true);
    }
  });

  const resetStatus = () => {
    setBerhasil(false);
    setGagal(false);
  };

  const batalForm = () => {
    reset();
    resetStatus();
  };

  return {
    register,
    submitForm,
    reset,
    errors,
    isSubmitting,
    berhasil,
    gagal,
    resetStatus,
    batalForm,
  };
}

export default useFormValidasi;
