<template>
    <v-form v-model="valid">
        <v-container>
            <v-layout>
                <v-flex xs12 md4>
                    <v-text-field v-model="user" label="Usuario" required></v-text-field>
                </v-flex>
            </v-layout>
        </v-container>
    </v-form>
</template>