import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import toast from "react-hot-toast";
import { NewNote } from "@/types/note";
import * as Yup from "yup";

interface NoteFormProps {
  onClose: () => void;
}

const initialValues: NewNote = {
  title: "",
  content: "",
  tag: "Choose category",
};

function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      onClose();
    },
    onError: (error) => {
      toast.error(`Failed to create note. ${error?.message}`);
    },
  });

  function handleSubmit(values: NewNote, actions: FormikHelpers<NewNote>) {
    mutation.mutate(values);
    actions.resetForm();
  }

  const NoteValidationShema = Yup.object().shape({
    title: Yup.string()
      .min(3, "min 3")
      .max(50, "max 50")
      .required("Title required"),
    content: Yup.string().max(500, "max 500"),
    tag: Yup.string()
      .oneOf([
        "Choose category",
        "Todo",
        "Work",
        "Personal",
        "Meeting",
        "Shopping",
      ])
      .required("Tag required"),
  });

  // 'actions' – набір методів, які надає Formik для керування формою.
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={NoteValidationShema}
    >
      {/* Formik надає компонент ErrorMessage, який можна розмістити під полем, щоб показувати текст помилки. */}
      <Form>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows="8"
            className={css.textarea}
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Choose category">Choose category</option>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>
        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={onClose}
            disabled={mutation.isPending}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={mutation.isPending}
          >
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default NoteForm;
