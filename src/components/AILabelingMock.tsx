import { useEffect, useState } from "react";

type Label = {
  id: number;
  title: string;
  confidence: number;
  imageUrl: string;
  status: string;
};

const mockLabels: Label[] = [
  {
    id: 1,
    title: "Person",
    confidence: 69.3,
    imageUrl: "https://via.placeholder.com/100",
    status: "pending",
  },
  {
    id: 2,
    title: "Car",
    confidence: 91.2,
    imageUrl: "https://via.placeholder.com/100",
    status: "pending",
  },
  {
    id: 3,
    title: "Car",
    confidence: 86.2,
    imageUrl: "https://via.placeholder.com/100",
    status: "pending",
  },
];

const AILabelingMock = () => {
  const [labels, setLabels] = useState<Label[]>([]);
  const [labelStatus, setLabelStatus] = useState<
    "approved" | "rejected" | "pending"
  >("pending");

  useEffect(() => {
    setLabels(mockLabels);
  });

  const handleLabelStatus = () => {
    setLabels(labels.map((label) => label.id))
  }

  return (
    <div>
      {labels.map((label) => (
        <div key={label.id}>
          {label.title}
          <p>Confidence: {label.confidence}</p>
          <button>Approve</button>
          <button>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default AILabelingMock;
