/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import loginImage from "./../../../assets/images/honey-1.webp";
import z from "zod";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Password from "@/components/ui/password";
import logo from "./../../../assets/icons/logo-icon.svg";
import GoogleAuthentication from "./GoogleAuthentication";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, { error: "Password field required!" }),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const result = await login(data).unwrap();
      if (result.success) {
        toast.success("Login successfully");
        navigate("/", { replace: true });
      }

      console.log(result);
    } catch (error: any) {
      console.log(error);

      if (error.data.message === "Password does not match!") {
        toast.error("Invalid credentials");
      } else if (error.data.message === "User is not verified!") {
        toast.info("Your are not verified. Please verified you account.");
        navigate("/verify", { state: data.email, replace: true });
      } else {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8">
            <Link replace to={"/"}>
              <img src={logo} className="mx-auto mb-3" />
            </Link>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Mouchak account
                </p>
              </div>

              {/* Form */}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john@example.com"
                            {...field}
                            value={field.value || ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between gap-5 flex-wrap">
                          <FormLabel>Password </FormLabel>
                          <Link
                            to="/forgot-password"
                            className="ml-auto text-sm underline-offset-2 hover:underline"
                          >
                            Forgot your password?
                          </Link>
                        </div>

                        <FormControl>
                          <Password {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              </Form>

              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <GoogleAuthentication />
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  replace
                  className="underline underline-offset-4"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-muted relative hidden md:block">
            <img
              src={loginImage}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
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
