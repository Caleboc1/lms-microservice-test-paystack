"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import { useUser } from "@clerk/nextjs"; // ✅ Use useUser()
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
    price: number;
    courseId: string;
}

export const CourseEnrollButton = ({ price, courseId }: CourseEnrollButtonProps) => {
    const { user } = useUser(); // ✅ Get user from Clerk
    const [isLoading, setIsLoading] = useState(false);

    const onclick = async () => {
        if (!user) {
            toast.error("You need to sign in first!");
            return;
        }

        try {
            setIsLoading(true);
            

            const response = await axios.post("https://paymentservice-lh9m.onrender.com/api/checkout", {
                email: user.primaryEmailAddress?.emailAddress, // ✅ Get email
                amount: price * 100,
                courseId: courseId,
                userId: user.id, // ✅ Get user ID
                callbackUrl: window.location.origin + `/`,
            });

            window.location.assign(response.data.authorizationUrl);
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button onClick={onclick} disabled={isLoading} size="sm" className="w-full md:w-auto">
            Enroll for {formatPrice(price)}
        </Button>
    );
};
