export default function CenterText({
  children,
}: {
  children: React.ReactNode;
}) {
  return <span className="w-full flex justify-center">{children}</span>;
}
