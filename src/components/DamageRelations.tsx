import React, { useEffect, useState } from "react";
import Type from "./Type";
import { DamageRelations as DamageRelationsProps } from "../types/DamageRelationOfPokemonTypes";
import {
  Damage,
  DamageFromAndTo,
  SeparateDamages,
} from "../types/SeparateDamageRelations";

interface DamageModalProps {
  damages: DamageRelationsProps[];
}

interface Info {
  name: string;
  url: string;
}

const DamageRelations = ({ damages }: DamageModalProps) => {
  const [damagePokemonForm, setDamagePokemonForm] = useState<SeparateDamages>();

  useEffect(() => {
    const arrayDamage = damages.map((damage) =>
      separateObjectBetweenToandFrom(damage)
    );

    if (arrayDamage.length === 2) {
      //2가지 속성일 때 데미지 from/to를 합침
      const obj = joinDamageRelations(arrayDamage);
      // console.log(obj);

      setDamagePokemonForm(reduceDuplicateValues(postDamageValue(obj.from))); //2가지 속성일 때 중복된 속성 항목은 합치고 배수 맞춰주기
    } else {
      setDamagePokemonForm(postDamageValue(arrayDamage[0].from));
    }
  }, []);

  const joinDamageRelations = (props: DamageFromAndTo[]): DamageFromAndTo => {
    return {
      to: joinObject(props, "to"),
      from: joinObject(props, "from"),
    };
  };

  const reduceDuplicateValues = (props: SeparateDamages) => {
    const duplicateValues = {
      double_damage: "4x",
      half_damage: "1/4x",
      no_damage: "0x",
    };
    return Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName as keyof typeof props;
      // console.log([keyName, value]);
      const verifiedValue = filterForUniqueValues(value, duplicateValues[key]);
      return (acc = { [keyName]: verifiedValue, ...acc });
    }, {});
  };

  const filterForUniqueValues = (
    valueForFiltering: Damage[],
    damageValue: string
  ) => {
    // console.log(valueForFiltering, damageValue);

    const initialArray: Damage[] = [];

    return valueForFiltering.reduce((acc, currentValue) => {
      // 속성만 쌓기
      const { url, name } = currentValue;
      // console.log(url, name);
      const filterACC = acc.filter((a) => a.name !== name); // name을 필터링

      return filterACC.length === acc.length
        ? (acc = [currentValue, ...acc])
        : (acc = [{ damageValue: damageValue, name, url }, ...filterACC]);
    }, initialArray);
  };

  const joinObject = (props: DamageFromAndTo[], string: string) => {
    const key = string as keyof (typeof props)[0];
    const firstArrayValue = props[0][key];
    const secondArrayValue = props[1][key];
    // console.log("props", props);
    // console.log("firstArrayValue", firstArrayValue);
    const result = Object.entries(secondArrayValue).reduce(
      (acc, [keyName, value]: [string, Damage]) => {
        // console.log(acc, [keyName, value]);
        const key = keyName as keyof typeof firstArrayValue;

        const result = firstArrayValue[key]?.concat(value); //keyname(더블/하프데미지 등)에 맞게 1,2배열이 합쳐짐
        return (acc = { [keyName]: result, ...acc }); // keyname별로 순회하면서 배열이 쌓임
      },
      {}
    );
    // console.log(result);
    return result;
  };

  //1타입 데미지 관계
  const postDamageValue = (props: SeparateDamages): SeparateDamages => {
    const result = Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName as keyof typeof props;
      const valuesOfKeyName = {
        double_damage: "2x",
        half_damage: "1/2x",
        no_damage: "0x",
      };

      return (acc = {
        [keyName]: value.map((i: Info[]) => ({
          damageValue: valuesOfKeyName[key],
          ...i,
        })),
        ...acc,
      });
    }, {});
    return result;
    // console.log(result);
  };

  //from, to로 데이터 가공
  const separateObjectBetweenToandFrom = (
    damage: DamageRelationsProps
  ): DamageFromAndTo => {
    const from = filterDamageRelations("_from", damage);

    const to = filterDamageRelations("_to", damage);

    return { from, to };
  };

  //데이터 가공 함수
  const filterDamageRelations = (
    valueFilter: string,
    damage: DamageRelationsProps
  ) => {
    const result = Object.entries(damage)
      .filter(([keyname, _]) => {
        return keyname.includes(valueFilter);
      })
      .reduce((acc, [keyName, value]) => {
        const keyWithValueFilterRemove = keyName.replace(valueFilter, "");
        return (acc = { [keyWithValueFilterRemove]: value, ...acc });
      }, {});
    return result;
  };

  return (
    <div className="flex gap-2 flex-col">
      {damagePokemonForm ? (
        <>
          {Object.entries(damagePokemonForm).map(
            ([keyName, value]: [string, Damage[]]) => {
              const key = keyName as keyof typeof damagePokemonForm;
              const valuesOfKeyName = {
                double_damage: "weak",
                half_damage: "Resistant",
                no_damage: "Immune",
              };
              return (
                <div key={key}>
                  <h3 className="capitalize font-medium text-sm md:text-base text-slate-500 text-center">
                    {valuesOfKeyName[key]}
                  </h3>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {value.length > 0 ? (
                      value.map(({ name, url, damageValue }) => {
                        return (
                          <Type
                            type={name}
                            key={url}
                            damageValue={damageValue}
                          />
                        );
                      })
                    ) : (
                      <Type type={"none"} key={"none"} />
                    )}
                  </div>
                </div>
              );
            }
          )}
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DamageRelations;
