import React, { Suspense } from "react";

import GridList from "@/app/(dashboard)/companies/components/gridList";
import { CompaniesList } from "@/constants/application";
import { ShareButton } from "@/components/elements/shareButton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  return (
    <main className="max-w-screen-3xl mx-auto">
      <header className="__header flex items-start justify-between gap-4">
        <h1 className="text-start text-h5 font-medium tracking-tight lg:text-start lg:text-h5 xl:text-h5">
          Mining Companies in the Democratic Republic of the Congo
        </h1>
        <div className="flex justify-end">
          <Suspense fallback={<Skeleton className="h-12 w-12 rounded-full" />}>
            <ShareButton />
          </Suspense>
        </div>
      </header>

      <section className="mb-24 mt-0 flex-col space-y-4 px-2 sm:mb-20 sm:mt-0 sm:px-8">
        <GridList data={CompaniesList} />
      </section>
    </main>
  );
}
