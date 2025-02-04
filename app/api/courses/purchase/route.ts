import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { userId, courseId } = await req.json();

        if (!userId || !courseId) {
            return NextResponse.json({ error: "Missing userId or courseId" }, { status: 400 });
        }

        // ✅ Insert purchase into Next.js database
        await db.purchase.create({
            data: {
                userId,
                courseId,
            },
        });

        console.log(`✅ Purchase recorded: User ${userId} unlocked Course ${courseId}`);

        return NextResponse.json({ message: "Purchase recorded successfully" }, { status: 200 });
    } catch (error) {
        console.error("❌ Error creating purchase:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
