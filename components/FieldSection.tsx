import FieldList from "./FieldList";

function FieldSection({
  section,
  inputFields,
}: {
  section: string;
  inputFields: {
    label: string;
    value: string;
    locked: boolean;
    editUrl: string;
  }[];
}) {
  return (
    <div key={section}>
      <h1 className="text-xl font-medium mb-8">{section}</h1>
      {inputFields.map((i) => (
        <FieldList
          key={i.label}
          label={i.label}
          value={i.value}
          locked={i.locked}
          editUrl={i.editUrl}
        />
      ))}
    </div>
  );
}

export default FieldSection;
