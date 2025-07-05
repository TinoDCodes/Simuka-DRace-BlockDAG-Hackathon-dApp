import { Button, Card, CardBody } from "@heroui/react";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <Card className="card">
        <CardBody>
          <p>Make beautiful websites regardless of your design experience.</p>
        </CardBody>
        <Button color="primary" className="w-96 mx-auto">
          Connect Wallet
        </Button>
      </Card>
    </div>
  );
}
