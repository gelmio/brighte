import { Pressable, StyleSheet, TextInput } from "react-native";

import { Text, View } from "../../components/Themed";
import Title from "../../components/Title";
import { useEffect, useState } from "react";
import { Referral } from "../../types";
import Table from "../../components/Table";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ViewTab() {
  const [search, onSearchChange] = useState<string>("");
  const [referrals, setReferrals] = useState<Referral[]>();

  const getReferrals = async () => {
    try {
      const response = await fetch(`http://localhost:3000/`, {
        method: "GET",
      });
      const referrals: Referral[] = await response.json();
      setReferrals(referrals);
    } catch (error) {
      setReferrals(undefined);
      console.log(error);
    }
  };

  useEffect(() => {
    getReferrals();
  }, []);

  return (
    <View>
      <Title>View Records</Title>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <TextInput
        placeholder="search"
        keyboardType="default"
        value={search}
        onChangeText={onSearchChange}
      />
      {!referrals ? (
        <Text>Loading</Text>
      ) : !referrals.length ? (
        <Text>No Referrals</Text>
      ) : (
        <Table
          items={referrals.filter(
            ({ first_name, last_name, email, phone }) =>
              first_name.includes(search) ||
              last_name.includes(search) ||
              email.includes(search) ||
              phone.includes(search)
          )}
          columns={[
            {
              key: "first_name",
              headerDisplay: "NAME",
              cellRender: ({ first_name, last_name, email }) => (
                <NameCell
                  {...{ firstName: first_name, lastName: last_name, email }}
                />
              ),
            },
            {
              key: "phone",
              headerDisplay: "PHONE",
              cellRender: ({ phone }) => <PhoneCell phone={phone} />,
            },
            {
              key: "other",
              headerDisplay: "ACTIONS",
              cellRender: () => (
                <Pressable
                  onPress={() => alert("This doesn't do anything just yet")}
                >
                  <MaterialCommunityIcons
                    name="dots-vertical"
                    size={24}
                    color="black"
                  />
                </Pressable>
              ),
            },
          ]}
        />
      )}
    </View>
  );
}

const NameCell = ({
  firstName,
  lastName,
  email,
}: {
  firstName: string;
  lastName: string;
  email: string;
}) => (
  <View>
    <Text>{`${firstName} ${lastName}`}</Text>
    <Text>{email}</Text>
  </View>
);

const PhoneCell = ({ phone }: { phone: string }) => (
  <Text>{`0${phone.substring(0, 4)}-${phone.substring(4, 7)}-${phone.substring(
    7
  )}`}</Text>
);

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
