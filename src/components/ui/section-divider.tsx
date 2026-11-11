/** A thin rule constrained to the same content width as the home sections. */
export function SectionDivider() {
  return (
    <div className="mx-auto w-full max-w-[1750px] px-4 sm:px-[50px]">
      <hr className="border-0 border-t border-[#e4e4e4] sm:mx-[19px]" />
    </div>
  );
}
