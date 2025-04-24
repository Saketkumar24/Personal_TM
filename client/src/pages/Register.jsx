import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button, Loading, Textbox } from "../components";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { setCredentials } from "../redux/slices/authSlice";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [registerUser, { isLoading }] = useRegisterMutation();

    const handleRegister = async (data) => {
        try {
            const res = await registerUser({ ...data, isAdmin: true }).unwrap();
            dispatch(setCredentials(res));
            toast.success("Registration Successful!");
            navigate("/log-in");
        } catch (err) {
            toast.error(err?.data?.message || "Registration failed");
        }
    };

    return (
        <div className='w-full min-h-screen flex items-center justify-center bg-[#f3f4f6] dark:bg-slate-900'>
            <form
                onSubmit={handleSubmit(handleRegister)}
                className='form-container w-full max-w-lg p-10 bg-white dark:bg-slate-800 rounded-lg shadow-xl flex flex-col gap-6'
            >
                <h2 className='text-3xl font-bold text-blue-700 dark:text-blue-400 text-center'>
                    Create an Account
                </h2>

                <Textbox
                    label='Name'
                    placeholder='Your Name'
                    name='name'
                    className='w-full rounded-full'
                    register={register("name", { required: "Name is required" })}
                    error={errors.name?.message}
                />

                <Textbox
                    label='Email Address'
                    placeholder='you@example.com'
                    type='email'
                    name='email'
                    className='w-full rounded-full'
                    register={register("email", { required: "Email is required" })}
                    error={errors.email?.message}
                />

                <Textbox
                    label='Password'
                    type='password'
                    placeholder='Password'
                    name='password'
                    className='w-full rounded-full'
                    register={register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                        },
                    })}
                    error={errors.password?.message}
                />

                <Textbox
                    label='Role'
                    placeholder='Admin / Manager / User'
                    name='role'
                    className='w-full rounded-full'
                    register={register("role", { required: "Role is required" })}
                    error={errors.role?.message}
                />

                <Textbox
                    label='Title'
                    placeholder='Administrator'
                    name='title'
                    className='w-full rounded-full'
                    register={register("title", { required: "Title is required" })}
                    error={errors.title?.message}
                />

                {isLoading ? (
                    <Loading />
                ) : (
                    <Button
                        type='submit'
                        label='Register'
                        className='w-full h-10 bg-blue-700 text-white rounded-full'
                    />
                )}
            </form>
        </div>
    );
};

export default Register;
