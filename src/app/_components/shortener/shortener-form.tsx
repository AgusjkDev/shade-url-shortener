"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { shortenFormSchema } from "@/data/schemas";
import type { Tables } from "@/types/supabase";

import { createShortenUrl } from "./_actions";

interface ShortenerFormProps {
    onSuccess: (values: Tables<"urls">) => void;
}

export default function ShortenerForm({ onSuccess }: Readonly<ShortenerFormProps>) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const form = useForm<z.infer<typeof shortenFormSchema>>({
        resolver: zodResolver(shortenFormSchema),
        defaultValues: {
            url: "",
        },
    });

    async function onSubmit(values: z.infer<typeof shortenFormSchema>) {
        setIsLoading(true);

        const response = await createShortenUrl(values);
        if (response.success) {
            onSuccess(response.data);
        } else {
            toast({ description: response.error });
        }

        form.reset();
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form
                noValidate
                autoComplete="off"
                className="flex w-full flex-col gap-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Url</FormLabel>

                            <FormControl>
                                <Input
                                    placeholder="https://www.example.com"
                                    type="url"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button disabled={isLoading} type="submit" className="w-36 self-start">
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 size-4 animate-spin" />

                            <span>Please wait</span>
                        </>
                    ) : (
                        "Shorten"
                    )}
                </Button>
            </form>
        </Form>
    );
}
