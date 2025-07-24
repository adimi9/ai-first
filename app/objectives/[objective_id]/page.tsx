export default async function ObjectivePage({
  params,
}: {
  params: Promise<{ objective_id: string }>;
}) {
  const { objective_id } = await params;
  return <div>{objective_id}</div>;
}
