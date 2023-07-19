import { Button, ScrollView, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { Controller, useForm } from "react-hook-form";
import { Referral } from "../../types";
import { TextInput } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import React from "react";

type CreateReferral = Omit<Referral, "id">;

export default function Create() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateReferral>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      address_one: "",
      address_two: "",
      suburb: "",
      state: "",
      postcode: "",
      phone: "",
      country: "Australia",
    },
  });

  const onSubmit = async (referral: CreateReferral) => {
    console.log(JSON.stringify(referral));

    try {
      const response = await fetch(`http://localhost:3000/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(referral),
      });
      console.log(response.status);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <Text style={styles.title}>Referral Builder</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View>
        {(
          [
            ["first_name", "First Name"],
            ["last_name", "Last Name"],
            ["email", "Email"],
            ["phone", "Mobile"],
            ["address_one", "Address Line 1"],
            ["address_two", "Address Line 2"],
            ["suburb", "Suburb"],
            ["postcode", "Postcode"],
          ] as [key: keyof CreateReferral, label: string][]
        ).map(([key, label]) => (
          <React.Fragment key={key}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="outlined"
                  label={label}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name={key}
            />
            {errors.first_name && <Text>This is required.</Text>}
          </React.Fragment>
        ))}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              onBlur={onBlur}
              onValueChange={onChange}
              selectedValue={value}
            >
              {["ACT", "NSW", "VIC", "TAS", "NT", "SA", "QLD", "WA"].map(
                (state) => (
                  <Picker.Item key={state} label={state} value={state} />
                )
              )}
            </Picker>
          )}
          name={"state"}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              onBlur={onBlur}
              onValueChange={onChange}
              selectedValue={value}
            >
              {["Australia"].map((country) => (
                <Picker.Item key={country} label={country} value={country} />
              ))}
            </Picker>
          )}
          name={"country"}
        />

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
