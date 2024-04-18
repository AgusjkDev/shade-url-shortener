import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    Pagination as PaginationRoot,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const DISABLED_CONTROL_CLASSES =
    "pointer-events-none text-muted-foreground hover:bg-transparent hover:text-muted-foreground";

interface PaginationProps {
    data: {
        count: number;
        page: number;
        perPage: number;
    };
}

export default function Pagination({ data: { count, page, perPage } }: Readonly<PaginationProps>) {
    const prev = page === 1 ? null : page - 1;
    const next = page * perPage < count ? page + 1 : null;
    const totalPages = count ? Math.ceil(count / perPage) : 0;
    const isLastPage = page === totalPages;

    return (
        <PaginationRoot>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        aria-disabled={!prev}
                        className={cn(!prev && DISABLED_CONTROL_CLASSES)}
                        href={`my-urls?page=${prev}`}
                        tabIndex={prev ? 0 : -1}
                    />
                </PaginationItem>

                {(() => {
                    const value = page === 1 ? 1 : isLastPage ? page - 2 : page - 1;

                    return (
                        <PaginationItem>
                            <PaginationLink href={`/my-urls?page=${value}`} isActive={page === 1}>
                                {value}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })()}

                {totalPages > 1 &&
                    (() => {
                        const value = page === 1 ? 2 : isLastPage ? page - 1 : page;

                        return (
                            <PaginationItem>
                                <PaginationLink
                                    href={`/my-urls?page=${value}`}
                                    isActive={page !== 1 && !isLastPage}
                                >
                                    {value}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })()}

                {totalPages > 2 &&
                    (() => {
                        const value = page === 1 ? 3 : isLastPage ? page : page + 1;

                        return (
                            <PaginationItem>
                                <PaginationLink
                                    href={`/my-urls?page=${value}`}
                                    isActive={isLastPage}
                                >
                                    {value}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })()}

                {totalPages - page >= 2 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                <PaginationItem>
                    <PaginationNext
                        aria-disabled={!next}
                        className={cn(!next && DISABLED_CONTROL_CLASSES)}
                        href={`my-urls?page=${next}`}
                        tabIndex={next ? 0 : -1}
                    />
                </PaginationItem>
            </PaginationContent>
        </PaginationRoot>
    );
}
