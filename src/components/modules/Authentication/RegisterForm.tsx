/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import loginImage from "./../../../assets/images/honey-2.webp";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Password from "@/components/ui/password";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";

const registerSchema = z
  .object({
    name: z.string().min(3, { error: "Name is too short!" }).max(50),
    email: z.email(),
    password: z.string().min(8, { error: "Password is too short!" }),
    confirmPassword: z
      .string()
      .min(8, { error: "Confirm Password is too short!" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    try {
      const result = await register(userInfo).unwrap();
      console.log(result);
      toast.success("You registered successfully");
      navigate("/verify", { state: data.email, replace: true });
    } catch (error: any) {
      console.log(error);
      if (
        error.status === 400 &&
        error?.data?.message === "User already exists!"
      ) {
        toast.error("You are already registered. Please Login");
      } else {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-muted relative hidden md:block">
            <img
              src={loginImage}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Register your account</h1>
                <p className="text-muted-foreground text-balance">
                  Enter your details to create an account
                </p>
              </div>

              {/* Form */}

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="pb-1">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jon Deo" type="text" {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="pb-1">Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="jon@gmail.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is your public display email.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="pb-1">Password</FormLabel>
                        <FormControl>
                          <Password {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is your password filed.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="pb-1">Confirm Password</FormLabel>
                        <FormControl>
                          <Password {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is your confirm password filed.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </form>
              </Form>

              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div>
                <Button variant="outline" className="w-full">
                  <FaGoogle
                    className="me-1 dark:text-white/60"
                    size={16}
                    aria-hidden="true"
                  />
                  Login with Google
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link to="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link to="/">Terms of Service</Link> and{" "}
        <Link to="/">Privacy Policy</Link>.
      </div>
    </div>
  );
}
