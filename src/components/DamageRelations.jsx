import React, { useEffect, useReducer } from "react";

const DamageRelations = ({ damages }) => {
  console.log("@@@@", damages);

  useEffect(() => {
    const arrayDamage = damages.map((damage) =>
      separateObjectBetweenToandFrom(damage)
    );
  }, []);

  const separateObjectBetweenToandFrom = (damage) => {
    const from = filterDamageRelations("_from", damage);

    const to = filterDamageRelations("_to", damage);

    return { from, to };
  };

  const filterDamageRelations = (valueFilter, damage) => {
    const result = Object.entries(damage)
      .filter(([keyname, value]) => {
        console.log("keyname", keyname);
        console.log("value", value);

        return keyname.includes(valueFilter);
      })
      .reduce((acc, [keyName, value]) => {
        const keyWithValueFilterRemove = keyName.replace(valueFilter, "");
        console.log(acc);
        return (acc = { [keyWithValueFilterRemove]: value, ...acc });
      }, {});
    return result;
  };

  return <div>DamageRelations</div>;
};

export default DamageRelations;
