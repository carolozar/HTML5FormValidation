import {
  ChangeEvent,
  FormEvent,
  InputHTMLAttributes,
  Ref,
  useRef,
  useState
} from "react";
import "./styles.css";

interface FormField<TValue> {
  value: TValue;
  error: boolean;
  errorMessage: string;
}

interface Form {
  name: FormField<string>;
  id: FormField<number>;
  email: FormField<string>;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref: Ref<any>;
}

interface FormInputProps {
  label: string;
  input: InputProps;
  errorMessage: string;
  error: boolean;
}

const FormInput = (props: FormInputProps): JSX.Element => (
  <div className={props.error ? "error" : ""}>
    <label>
      {props.label}
      <input {...props.input} />
    </label>
    {props.errorMessage && <div>{props.errorMessage}</div>}
  </div>
);

const initialForm = {
  name: {
    value: "",
    error: false,
    errorMessage: ""
  },
  id: {
    value: 1,
    error: false,
    errorMessage: ""
  },
  email: {
    value: "",
    error: false,
    errorMessage: ""
  }
} as Form;

export default function App() {
  const [form, setForm] = useState<Form>(initialForm);
  const formRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleOnInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;

    setForm((prevForm) => ({
      ...prevForm,
      [target.id]: {
        value: target.value,
        error: !target.checkValidity(),
        errorMessage: target.validationMessage
      }
    }));
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (formRef.current?.checkValidity()) {
      alert("Hoorrayy!! Succefully created the user!");
    } else {
      if (nameRef.current && idRef.current && emailRef.current) {
        setForm({
          name: {
            value: nameRef.current.value,
            error: !nameRef.current.validity.valid,
            errorMessage: nameRef.current.validationMessage
          },
          id: {
            value: (idRef.current.value as unknown) as number,
            error: !idRef.current.validity.valid,
            errorMessage: idRef.current.validationMessage
          },
          email: {
            value: emailRef.current.value,
            error: !emailRef.current.validity.valid,
            errorMessage: emailRef.current.validationMessage
          }
        });
      }
    }
  };

  return (
    <div className="App">
      <h1>Form validation</h1>
      <form ref={formRef}>
        <FormInput
          label="User ID: "
          input={{
            id: "id",
            type: "number",
            required: false,
            value: form.id.value,
            onChange: handleOnInputChange,
            ref: idRef
          }}
          errorMessage={form.id.errorMessage}
          error={form.id.error}
        />
        <FormInput
          label="Name: "
          input={{
            id: "name",
            type: "text",
            required: true,
            value: form.name.value,
            onChange: handleOnInputChange,
            ref: nameRef
          }}
          errorMessage={form.name.errorMessage}
          error={form.name.error}
        />
        <FormInput
          label="Email address: "
          input={{
            id: "email",
            type: "email",
            required: true,
            value: form.email.value,
            onChange: handleOnInputChange,
            ref: emailRef
          }}
          errorMessage={form.email.errorMessage}
          error={form.email.error}
        />

        <button type="submit" onClick={handleFormSubmit}>
          Create
        </button>
      </form>
    </div>
  );
}
