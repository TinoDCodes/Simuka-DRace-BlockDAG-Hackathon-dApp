const TotePool = () => {
  return (
    <div>
      TotePool
      {/* POOL */}
      {/* <section>
        <Card className="bg-slate-800 shadow-lg rounded-2xl">
          <CardHeader>
            <h2 className="text-xl font-semibold">Tote Pool</h2>
            <p className="text-sm text-slate-400">
              Total Liquidity: {race.pool.totalLiquidity.toLocaleString()} RACE
            </p>
          </CardHeader>

          <CardBody>
            <Progress
              value={(race.pool.LifeTime / race.pool.totalLiquidity) * 100}
              //   showValue={false}
              className="h-2 rounded-full bg-slate-700"
            />
            <div className="mt-4 space-y-2">
              {race.pool.breakdowns.map((bd) => (
                <div
                  key={bd.id}
                  className="flex justify-between text-sm text-slate-200"
                >
                  <span>Runner {bd.id}</span>
                  <span>
                    {bd.impliedOdds.toFixed(1)} ({bd.liquidity.toLocaleString()}
                    )
                  </span>
                </div>
              ))}
            </div>
          </CardBody>

          <CardFooter>
            <Button className="w-full py-3 bg-emerald-500 text-slate-900">
              Place Tote Bet
            </Button>
          </CardFooter>
        </Card>
      </section> */}
    </div>
  );
};

export default TotePool;
